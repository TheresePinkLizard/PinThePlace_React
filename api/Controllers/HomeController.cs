using Microsoft.AspNetCore.Mvc;

namespace PinThePlace.Controllers 
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
/*
kode for å få index til å være forside med innhold som er table


using Microsoft.AspNetCore.Mvc;
using PinThePlace.ViewModels;
using PinThePlace.Models; 
using System.Linq;

namespace PinThePlace.Controllers 
{
    public class HomeController : Controller
    {
        private readonly PinDbContext _context; // Define _context

        // Inject PinDbContext into the constructor
        public HomeController(PinDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var pins = _context.Pins.ToList();
            var viewModel = new PinsViewModel {Pins = pins, CurrentViewName = "Home"};
            return View(viewModel);
        }
    }
}
*/