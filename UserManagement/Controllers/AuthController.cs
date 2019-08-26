using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UserManagement.AppConst;
using UserManagement.Data;
using UserManagement.Models;
using UserManagement.ViewModel;

namespace UserManagement.Controllers
{
    [AllowAnonymous]
    public class AuthController : Controller
    {
        private readonly AppDbContext context;
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;

       

        public AuthController(AppDbContext context, SignInManager<User> signInManager, UserManager<User> userManager, IConfiguration configuration)
        {
            this.context = context;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.configuration = configuration;
        }
        [HttpPost]
        public IActionResult Register([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest("data not valid");
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
                PhoneNumber = model.Phone,
            };

            IdentityResult result = userManager.CreateAsync(user, model.Password).Result;
            if (result.Succeeded)
            {
                var findUser = userManager.FindByEmailAsync(model.Email).Result;
                if (model.Role == RoleEnum.Manager)
                    userManager.AddToRolesAsync(findUser, new[] {RoleConst.Manager }).Wait();
                else if (model.Role == RoleEnum.Sales)
                    userManager.AddToRolesAsync(findUser, new[] { RoleConst.Sales }).Wait();
            }
            return Ok();
        }
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (result.Succeeded)
            {
                return Ok(new { tokenString = GenerateToken(user).Result });
            }
            return Unauthorized();
            //generate token 
        }

        public async Task<IActionResult> All()
        {
            var rolesWithUser = await(from user in context.Users
                                      orderby user.UserName
                                      select new
                                      {
                                          id = user.Id,
                                          Name = user.Name,
                                          Email = user.Email,
                                          roles = (from userRoles in user.UserRoles
                                                   join
                  role in context.Roles on
                  userRoles.RoleId equals role.Id
                                                   select role.Name)
                                      }).ToListAsync();

            return Ok(rolesWithUser);
        }
        private async Task<string> GenerateToken(User user)
        {
            var cliams = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var roles = await userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                cliams.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(cliams),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
    }
}