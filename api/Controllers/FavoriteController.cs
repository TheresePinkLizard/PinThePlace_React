using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PinThePlace.Models;
using PinThePlace.ViewModels;
using PinThePlace.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

public class FavoriteController : Controller
{
    private readonly IPinRepository _pinRepository; // deklarerer en privat kun lesbar felt for å lagre instanser av ItemDbContext
    private readonly UserManager <User> _userManager;
    private readonly ILogger<FavoriteController> _logger;

      public FavoriteController(IPinRepository pinRepository, UserManager<User> userManager, ILogger<FavoriteController> logger)
    {
        _pinRepository = pinRepository;
        _userManager = userManager;
        _logger = logger; 
    }

     public async Task<IActionResult> Table()
    {  
        // henter alle items fra items table i databasen og konverterer til en liste
        var favorites = await _pinRepository.GetAllFavorites();

        var pins = await _pinRepository.GetAll();
        if(!pins.Any())
        {
            _logger.LogError("[PinController] Pin list not found while executing _pinRepository.GetAll()");
            return NotFound("Pin list not found");
        }

        if(!favorites.Any())
        {
            _logger.LogError("[PinController] Favorite list not found while executing _pinRepository.GetAllFavorties()");
            return NotFound("Favorite list not found");
        }

        var pinsViewModel = new PinsViewModel(pins,favorites, "Table");
        // en action kan returnere enten: View, JSON, en Redirect, eller annet. 
        // denne returnerer en view
        //Console.WriteLine($"Fetched {pins.Count} pins from the database.");
        return View(pinsViewModel);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> AddToFavorites(int id)
    {   
        var user = _userManager.GetUserId(User);
        var pin = await _pinRepository.GetItemById(id);

        var favorite = new Favorite
        {
            PinId = pin.PinId,
            UserId=user,
            MadeBy=pin.UserName,
        };
       
    return View("CreateFavorite",favorite);
    }

    [HttpPost]
    [Authorize]// Ensure the user is logged in
    public async Task<IActionResult> AddToFavorites(Favorite favorite)
    {
        if(ModelState.IsValid)
        {
           favorite.Pin = await _pinRepository.GetItemById(favorite.PinId);
           favorite.User = await _userManager.FindByIdAsync(favorite.UserId);
        }
    // Fetch the Pin with the given ID
        var success = await _pinRepository.SaveFavorite(favorite);

        if (success)
        {
             return RedirectToAction(nameof(Table),"Pin");
        }
         _logger.LogWarning("[FavoriteController] Favorite creation failed {@favorite}", favorite);
        return View("CreateFavorite",favorite);


    }

     [HttpGet]
    [Authorize]
    public async Task<IActionResult> UpdateFavorite(int id)  // denne metoden viser utfyllingsskjemaet for å oppdatere en eksisterende item
    {                                   // metoden slår ut når bruker navigerer seg til update siden
        // retrieves current user
        var userName = _userManager.GetUserName(User);
        var userId = _userManager.GetUserId(User);
       
        
        // henter fra database ved hjelp av id
        var favorite = await _pinRepository.GetFavoriteById(id); 
        var pin = await _pinRepository.GetItemById(favorite.PinId);
          
        if (favorite == null)               // sjekk om den finner item
        {
            _logger.LogError("[FavoriteController] Favorite not found when updating the Favorite {FavoriteId:0000}", id);
            return NotFound("Favorite not found for the FavoriteId");

        } else{
             if (userName != "Admin" )
            {
                if(userId != favorite.UserId){
                    return Unauthorized();
                }
                
            }
        
        }

        favorite.MadeBy=pin.UserName;
        return View(favorite); 
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UpdateFavorite(Favorite favorite)  // tar informasjonen som er skrevet i update skjema,
    {   
        
        if (ModelState.IsValid)
        {
            bool returnOk = await _pinRepository.UpdateFavorite(favorite);
            if(returnOk)
            {
            return RedirectToAction(nameof(Table),"Pin"); // displayer den oppdaterte listen
            }
        }
        _logger.LogWarning("[FavoriteController] Favorite update failed {@favorite}", favorite);
        return RedirectToAction(nameof(Table),"Pin");
    }


    [HttpGet]
    [Authorize]
    public async Task<IActionResult> DeleteFavorite(int id)  // displayer confirmation page for å slette en item
    {
          // retrieves current user
        var userName = _userManager.GetUserName(User);
        var userId =  _userManager.GetUserId(User);
        var favorite = await _pinRepository.GetFavoriteById(id); // identifiserer og henter item som skal bli slettet
         
         if (favorite == null)               // sjekk om den finner item
        {   
            _logger.LogError("[FavoriteController] Favorite deletion failed for {FavortieId:0000}", id);
            return NotFound("Favorite not found for the FavoriteId");

        } 
       return View("DeleteFavorite",favorite);   // hvis funnet, returnerer view med item data for bekreftelse
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> DeleteConfirmed(int id) // metoden som faktisk sletter item fra database
    {
        bool returnOk = await _pinRepository.DeleteFavorite(id);  // lagrer endringene 
        if (!returnOk)
        {
            _logger.LogError("[FavoriteController] Favorite deletion failed for {FavoriteId:0000}", id);
            return BadRequest("Favorite deletion failed");
        }
        return RedirectToAction(nameof(Table),"Pin"); //returnerer bruker til table view hvor item nå er fjernet
    }




 



}