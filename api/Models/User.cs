using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace PinThePlace.Models
{

public class User : IdentityUser
{
     public virtual List<Pin>? Pins {get;set;}

}
}