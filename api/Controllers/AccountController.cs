using Microsoft.AspNetCore.Mvc;
using PinThePlace.Models;
using PinThePlace.DTOs;
using Microsoft.EntityFrameworkCore;
using PinThePlace.DAL;
using Microsoft.AspNetCore.Identity;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Claims; 
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace PinThePlace.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

     private readonly ILogger<PinController> _logger;


    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<PinController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto logindto)
    {
      var user = await _userManager.FindByNameAsync(logindto.UserName);
        if (user != null && await _userManager.CheckPasswordAsync(user, logindto.Password))
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim("userId", user.Id)
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super_long_and_super_secure_secret_key_26143526143514352134621321313524362145"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "pintheplace.com",
            audience: "pintheplace.com",
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), userId=user.Id });
    }
    else
    {
        _logger.LogError("[AccountController] Login failed for the user {UserName}", logindto.UserName);
        return BadRequest("Username or password is incorrect.");
        }
    }






}
