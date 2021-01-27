using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace webapi.Models
{

    [Table("Users")]
    public class User
    {
        [Key]
        [Column("Username")]
        public string Username { get; set; }
        [Column("Password")]
        public string Password { get; set; }
        //public List<Blok> Lista{get;set;}
        [Column("HighScore")]
        public int HS { get; set; }
        [Column("Lopta")]
        public Ball Lopta { get; set; }
        [Column("Slider")]
        public Slider Slider { get; set; }

    }

}