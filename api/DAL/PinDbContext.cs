

using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using PinThePlace.Models; 

namespace PinThePlace.DAL;
public class PinDbContext : IdentityDbContext<User> 
{
    public PinDbContext(DbContextOptions<PinDbContext> options) : base (options) 
    {
    
    }                             
    public DbSet<Pin> Pins { get; set; } 
    public DbSet<Favorite> Favorites {get; set;}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }
}