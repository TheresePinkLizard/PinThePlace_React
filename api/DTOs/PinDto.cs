using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PinThePlace.DTOs
{
    public class PinDto {
        public int PinId { get; set; }

        [Required]
       [RegularExpression(@"^[0-9a-zA-ZæøåÆØÅ ]*$",ErrorMessage="You can only have numbers and letters in the name")]
        public string Name { get; set; } = string.Empty; 
                                        

        [Required]
        [Range(1,5, ErrorMessage ="Rating must be between 1 and 5!")]
        public decimal Rating { get; set; }      

        [StringLength(200)]   
        public string? Comment { get; set; }    
        public string? ImageUrl { get; set; }

        [NotMapped]
        public IFormFile? UploadedImage {get; set;}

        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; } 

         // adds date for when object is created
        [Required]
        public DateTime DateCreated { get; set; } = DateTime.Now;

        //navigation property
        // Foreign key for User

         [Required]
        public string UserId {get; set;} = string.Empty;
         [Required]
        public string UserName { get; set; } = string.Empty;
        
        // Navigation property for User
        //public virtual User? User { get; set; }
    }
}