using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PinThePlace.Models
{
    public class Favorite {

        public int FavoriteId {get; set;}

        [StringLength(100)] 
        public string? Category {get; set;}

        public string MadeBy {get; set;} = string.Empty;

        public int PinId { get; set; }

        public string UserId {get; set;} = string.Empty;


        public virtual User? User { get; set; }

        public virtual Pin? Pin { get; set; }



    }
}