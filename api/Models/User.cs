using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace PinThePlace.Models
{

public class User : IdentityUser
{
    /*
    public int UserId{ get; set; }

    public string UserName{get; set;} = string.Empty;

    //public string FirstName{ get; set; } = string.Empty;

    //public string LastName{ get; set; } = string.Empty;

    public string Email{ get; set; } = string.Empty;

   

    public string Password{ get; set; } = string.Empty;
    */
     public virtual List<Pin>? Pins {get;set;}

}
}