using Microsoft.AspNetCore.Mvc;

namespace PinThePlace.Controllers 
{
    public class HomeController : Controller
    {
        
        public IActionResult Index()
        {
            return View();
        }
    }
}
