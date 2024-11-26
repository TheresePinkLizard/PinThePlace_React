using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PinThePlace.Models
{
    public class Pin {
        public int PinId { get; set; }

        //[RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2-20}", ErrorMessage="The name of the Pin must be numbers or letters between 2 to 20 characters!")]
       // [Display(Name="Pin name")]

       [RegularExpression(@"^[0-9a-zA-ZæøåÆØÅ ]*$",ErrorMessage="You can only have numbers and letters in the name")]
        public string Name { get; set; } = string.Empty; //  = string.Empty;  is to state this is a mandatory value, has empthy string by default. 
                                        //can also use ? on nullable variabels instead, like this code shows

        [Range(1,5, ErrorMessage ="Rating must be between 1 and 5!")]
        public decimal Rating { get; set; }      

        [StringLength(200)]   
        public string? Comment { get; set; }    
        public string? ImageUrl { get; set; }

        [NotMapped]
        public IFormFile? UploadedImage {get; set;}

        public double Latitude { get; set; }
        public double Longitude { get; set; } 

         // adds date for when object is created
        public DateTime DateCreated { get; set; } = DateTime.Now;

        //navigation property
        // Foreign key for User

        public string UserId {get; set;} = string.Empty;
        public string UserName { get; set; } = string.Empty;
        
        // Navigation property for User
        public virtual User? User { get; set; }
    }
}