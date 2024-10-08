using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<SecurityGroup> SecurityGroups { get; set; }
    public DbSet<Permission> Permissions { get; set; }
}
