using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace webapi.Models
{

    [Table("Sliders")]
    public class Slider
    {
        [Key]
        [Column("User")]
        public string User { get; set; }
        [Column("Color")]
        public string Color { get; set; }
        //public List<Blok> Lista{get;set;}
    }

}