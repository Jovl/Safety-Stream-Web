namespace SafetyStream.Models
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class UserContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Users");
            //Configure a One-To-Many Relationship using Fluent API. Users many of type user.
            modelBuilder.Entity<Users>()
            .HasRequired<User>(o => o.User)
            .WithMany(o => o.Users)
            .HasForeignKey(o => o.User.UserId);
        }
    }

}