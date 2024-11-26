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


namespace PinThePlace.Controllers;

public class PinController : Controller
{

    private readonly IPinRepository _pinRepository; // deklarerer en privat kun lesbar felt for å lagre instanser av ItemDbContext
    private readonly UserManager <User> _userManager;
    private readonly ILogger<PinController> _logger;


      public PinController(IPinRepository pinRepository, UserManager<User> userManager, ILogger<PinController> logger)
    {
        _pinRepository = pinRepository;
        _userManager = userManager;
        _logger = logger; 
    }

    // async i metodene:
    // gjør siden mer responsive. den lar programmet kjøre flere tasks concurrently uten å blokkere main thread.
    // dette får siden til å virke mer responsiv ved å la andre oppgaver gå i forveien istedet for at alt venter på et program.
    // await hører også til async

    // en action som korresponderer til en brukers interaksjon, slik som å liste opp items når en url lastes
    public async Task<IActionResult> Table()
    {  
        // henter alle items fra items table i databasen og konverterer til en liste
        var pins = await _pinRepository.GetAll();

        if(!pins.Any())
        {
            _logger.LogError("[PinController] Pin list not found while executing _pinRepository.GetAll()");
            return NotFound("Pin list not found");
        }

        var pinsViewModel = new PinsViewModel(pins, "Table");
        // en action kan returnere enten: View, JSON, en Redirect, eller annet. 
        // denne returnerer en view
        //Console.WriteLine($"Fetched {pins.Count} pins from the database.");
        return View(pinsViewModel);
    }

    public async Task<IActionResult> Details(int id)
    {
        //List<Pin> pins = await _pinDbContext.Pins.ToListAsync();
        //var pin= pins.FirstOrDefault(i => i.PinId == id); // søker igjennom listen items til første som matcher id
        var pin = await _pinRepository.GetItemById(id);

        if (pin == null)
            {
            _logger.LogError("[PinController] Pin not found for the PinId {PinId:0000}", id);
            return NotFound("Pin not found for the PinId");
            }
        return View(pin); // returnerer view med et item
    }

    //  Http Get og post for å gjøre CRUD
    //Get: It returns a view (the "Create" view) that contains a form where the user can enter details for creating the new item
    [HttpGet]
    [Authorize]
    public IActionResult Create() // trigges når bruker navigerer til create siden
    {
        return View(); // returnerer view hvor bruker kan skrice inn detaljer for å lage et nytt item
    }

// post:  is used to handle the submission of the form when the user clicks the "Create" button
    [HttpPost]
    [Authorize]   
    public async Task<IActionResult> Create(Pin pin)
    {
        if (ModelState.IsValid)
        {
            // Get the current user's ID
            var userName = _userManager.GetUserName(User);
            var userId = _userManager.GetUserId(User);

            if (userName == null)
            {
                // Håndter tilfelle der brukeren ikke er logget inn
                return Unauthorized();
            }
            
            // Set the user ID on the pin
            pin.UserName = userName;

            if (userId == null)
            {
                return Unauthorized();
            }
            
            pin.UserId =userId; 
            
            var file = pin.UploadedImage;

            if(file != null && file.Length >0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot/images",fileName);

                using(var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

                pin.ImageUrl = "/images/"+fileName;
            }

            bool returnOk= await _pinRepository.Create(pin);
            if (returnOk)
            {
                return RedirectToAction(nameof(Table));
            }
        }
        _logger.LogWarning("[PinController] Pin creation failed {@pin}", pin);
        return View(pin);
    }

    // kodene under gjør at update og delete fungerer
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Update(int id)  // denne metoden viser utfyllingsskjemaet for å oppdatere en eksisterende item
    {                                   // metoden slår ut når bruker navigerer seg til update siden
        // retrieves current user
        var userName = _userManager.GetUserName(User);
        
        // henter fra database ved hjelp av id
        var pin = await _pinRepository.GetItemById(id); 
          
        if (pin == null)               // sjekk om den finner item
        {
            _logger.LogError("[PinController] Pin not found when updating the pin {PinId:0000}", id);
            return NotFound("Pin not found for the pinId");

        } else{
             if (userName != "Admin" )
            {
                if(userName != pin.UserName){
                    return Unauthorized();
                }
                
            }
        }
        return View(pin); 
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Update(Pin pin)  // tar informasjonen som er skrevet i update skjema,
    {   
        
                                               // ser hvis det er valid og oppdaterer i database
        if (ModelState.IsValid)
        {
            var file = pin.UploadedImage;
   
            if(file != null && file.Length >0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot/images",fileName);
                using(var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

                pin.ImageUrl = "/images/"+fileName;
            } 

            bool returnOk = await _pinRepository.Update(pin);
            if(returnOk)
            {
            return RedirectToAction(nameof(Table)); // displayer den oppdaterte listen
            }
        }
        _logger.LogWarning("[PinController] Pin update failed {@pin}", pin);
        return View(pin);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Delete(int id)  // displayer confirmation page for å slette en item
    {
          // retrieves current user
        var userName = _userManager.GetUserName(User);
        var pin = await _pinRepository.GetItemById(id);  // identifiserer og henter item som skal bli slettet
         
         if (pin == null)               // sjekk om den finner item
        {   
            _logger.LogError("[PinController] Pin deleteion failed for {PinId:0000}", id);
            return NotFound("Pin not found for the PinId");

        } else{
            if (userName != "Admin" )
            {
                if(userName != pin.UserName){
                    return Unauthorized();
                }
                
            }
        }
        return View(pin);   // hvis funnet, returnerer view med item data for bekreftelse
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> DeleteConfirmed(int id) // metoden som faktisk sletter item fra database
    {
        bool returnOk = await _pinRepository.Delete(id);  // lagrer endringene 
        if (!returnOk)
        {
            _logger.LogError("[PinController] Pin deletion failed for {PinId:0000}", id);
            return BadRequest("Pin deletion failed");
        }
        return RedirectToAction(nameof(Table)); //returnerer bruker til table view hvor item nå er fjernet
    }
    
}

