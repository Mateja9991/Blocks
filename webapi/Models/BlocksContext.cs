
using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{

    public class BlocksContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Ball> Balls { get; set; }
        public DbSet<Slider> Sliders { get; set; }
        //public DbSet<BlokList> BlokListe { get; set; }
        //public DbSet<Blok> Blokovi { get; set; }

        public BlocksContext(DbContextOptions options)
        : base(options)
        {
        }

    }
}

