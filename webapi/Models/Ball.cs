using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace webapi.Models
{

    [Table("Balls")]
    public class Ball
    {
        [Key]
        [Column("User")]
        public string User { get; set; }
        [Column("Speed")]
        public float Speed { get; set; }
        //public List<Blok> Lista{get;set;}
    }

}