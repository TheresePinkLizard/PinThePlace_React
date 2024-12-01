using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PinThePlace.DTOs{
public class UserDto
    {
         public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        // Referance to PinDto-listen
        public List<PinDto>? Pins { get; set; }
    }
}