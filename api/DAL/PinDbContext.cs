// Kode for database i forhold til shop items. Enkelte nettsider kan ha flere slike database klasser

using Microsoft.EntityFrameworkCore; // importerer Entity framework core funksjoner som er nødvendig for database operasjoner
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using PinThePlace.Models; // namespace: er en container som holder logisk gruppering av relaterte klasser, interfaces, structs, enums og delegates. Hjelper å organisere kode, unngå navnkonflikt og forbedre koden sin vedlikeholdbarhet

namespace PinThePlace.DAL;
public class PinDbContext : IdentityDbContext<User> // definerer at classen ItemDbContext arver fra DbContext. DbContext representerer en session med databasen. session(midlertidig interaktiv informasjons interchange) det er brukt til å query og lagre data til databasen
{
    public PinDbContext(DbContextOptions<PinDbContext> options) : base (options) // konstruktør. konfigurerer database connection string
    {
       /* try
        {
            Database.EnsureCreated();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating database: {ex.Message}");
        }*/
        // lager en tom database hvis den ikke eksisterer en database fra før av som er ssosiert med nåværende DbContext
    }                              // lager database med schema(tables,indexes, etc) basert på nåværende model definert i DbContext
    public DbSet<Pin> Pins { get; set; } // metoder for å lagre instanser av Item
    //public DbSet<User> Users{ get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }
}