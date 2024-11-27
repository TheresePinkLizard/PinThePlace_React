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
using Microsoft.Extensions.Configuration.UserSecrets;
using PinThePlace.DTOs;


namespace PinThePlace.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PinAPIController : Controller
{
    private readonly IPinRepository _pinRepository;

    private readonly UserManager <User> _userManager;
    private readonly ILogger<PinController> _logger;

    public PinAPIController(IPinRepository pinRepository, UserManager<User> userManager,  ILogger<PinController> logger)
    {
        _pinRepository = pinRepository;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet("pinlist")]
    public async Task<IActionResult> PinList()
    {
        var pins = await _pinRepository.GetAll();
        if (pins == null)
        {
            _logger.LogError("[PinAPIController] Pin list not found while executing _pinRepository.GetAll()");
            return NotFound("Pin list not found");
        }
        var pinDtos = pins.Select(pin => new PinDto
        {
            PinId = pin.PinId,
            Name = pin.Name,
            Rating = pin.Rating,
            Comment = pin.Comment,
            ImageUrl = pin.ImageUrl,
            Latitude = pin.Latitude,
            Longitude = pin.Longitude,
            DateCreated = pin.DateCreated,
            UserName = pin.UserName,
            UserId = pin.UserId
        
        });
        return Ok(pinDtos);
    }

[HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] PinDto pinDto)
    {
        if (pinDto == null)
        {
            return BadRequest("Pin cannot be null");
        }
        var newPin = new Pin
        {
            Name = pinDto.Name,
            Rating = pinDto.Rating,
            Comment = pinDto.Comment,
            ImageUrl = pinDto.ImageUrl,
            Latitude = pinDto.Latitude,
            Longitude = pinDto.Longitude,
            UploadedImage = pinDto.UploadedImage,
            DateCreated = pinDto.DateCreated,
            UserId = pinDto.UserId,
            UserName = pinDto.UserName
        };        
        bool returnOk = await _pinRepository.Create(newPin);
        if (returnOk)
            return CreatedAtAction(nameof(PinList), new { id = newPin.PinId }, newPin);

        _logger.LogWarning("[PinAPIController] Pin creation failed {@pin}", newPin);
        return StatusCode(500, "Internal server error");
    }

    [HttpGet("{id}")]

    public async Task<IActionResult> GetPin(int id)
    {
        var pin = await _pinRepository.GetItemById(id);
        if (pin == null)
        {
            _logger.LogError("[PinAPIController] Pin not found for PinId {PinId:0000}",id);
            return NotFound("Pin not found");

        }
        return Ok(pin);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] PinDto pinDto)
    {
        if (pinDto == null)
        {
            return BadRequest("Pin data cannot be null");
        }
        // Find the item in the database
        var existingPin = await _pinRepository.GetItemById(id);
        if (existingPin == null)
        {
            return NotFound("Pin not found");
        }
        // Update the item properties
        existingPin.Name = pinDto.Name;
        existingPin.Rating = pinDto.Rating;
        existingPin.Comment = pinDto.Comment;
        existingPin.ImageUrl = pinDto.ImageUrl;
        existingPin.DateCreated = pinDto.DateCreated;
        existingPin.Latitude = pinDto.Latitude;
        existingPin.Longitude = pinDto.Longitude;
        existingPin.UserId = pinDto.UserId;
        existingPin.UserName = pinDto.UserName;
        existingPin.UploadedImage = pinDto.UploadedImage;
        
        // Save the changes
        bool updateSuccessful = await _pinRepository.Update(existingPin);
        if (updateSuccessful)
        {
            return Ok(existingPin); // Return the updated item
        }

        _logger.LogWarning("[PinAPIController] Pin update failed {@pin}", existingPin);
        return StatusCode(500, "Internal server error");
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        bool returnOk = await _pinRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[PinAPIController] pin deletion failed for the PinId {PinId:0000}", id);
            return BadRequest("Pin deletion failed");
        }
        return NoContent(); // 200 Ok is commonly used when the server returns a response body with additional information about the result of the request. For a DELETE operation, there's generally no need to return additional data, making 204 NoContent a better fit.
    } 












}



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
                var filePath = Path.Combine(Directory.GetCurrentDirectory(),"/wwwroot/images",fileName);

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

