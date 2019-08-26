using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.AppConst;
using UserManagement.Models;

namespace UserManagement.Helpers
{
    public class SeedDatabase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;

        public SeedDatabase(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public void SeedUsers()
        {

            if (!userManager.Users.Any())
            {
                var roles = new List<Role>
                {
                       new Role {Name = RoleConst.Admin},
                       new Role {Name = RoleConst.Manager},
                       new Role {Name = RoleConst.Sales}
                 };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                var adminUser = new User { UserName = "Admin", Email = "admin@live.com", Name = "Asif" };
                IdentityResult result = userManager.CreateAsync(adminUser, "12345").Result;
                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, roles.Select(x => x.NormalizedName).ToList()).Wait();
                }

            }
        }
    }
}