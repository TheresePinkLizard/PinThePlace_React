using Microsoft.AspNetCore.Mvc;
using PinThePlace.Models;
using Microsoft.EntityFrameworkCore;
using PinThePlace.DAL;
using Microsoft.AspNetCore.Identity;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http.HttpResults;

namespace PinThePlace.Controllers;

public class UserController : Controller
{
    private readonly PinDbContext _pinDbContext;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<UserController> _logger;

   public UserController(PinDbContext pinDbContext, UserManager<User> userManager, ILogger<UserController> logger)
        {
            _pinDbContext = pinDbContext;
            _userManager = userManager;
            _logger = logger;
        }

    public async Task<IActionResult> Table()
    {
        try{
        List<User> users = await _pinDbContext.Users.ToListAsync();

        var userName = _userManager.GetUserName(User);
        
        if (userName != "Admin" )
        {
            return Unauthorized();
            
        }else{
            return View(users);
        }
        }
        catch (Exception e){
            _logger.LogError(e, "[UserController] Error while fetching users in Table action");
            return NotFound("User list not found");
        }
    }

     public async Task<IActionResult> MyPins()
        {
            try{
            // Get the current user's ID
            var userId = _userManager.GetUserId(User);

            // Get the user and their pins from the database
            var user = await _pinDbContext.Users
                .Include(u => u.Pins)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                _logger.LogWarning("[UserController] User not found in MyPins for UserId {UserId:0000}", userId);
                return NotFound("User with was not found.");
            }

            // Pass the pins to the view
            return View(user.Pins);
            }
            catch (Exception e){
                _logger.LogError(e, "[UserController] Error occured while fetching pins for MyPins for User {UserId:0000}", _userManager.GetUserId(User));
                return NotFound();
            }
        }
}