using PinThePlace.Models;

namespace PinThePlace.ViewModels
{
    public class PinsViewModel
    {
        public IEnumerable<Pin> Pins;
        public IEnumerable<Favorite> Favorites;
        
        // for å gjøre det lettere å holde styr på de forskjellige navnene som skal byttes ut med currentViewName
        public string? CurrentViewName;

        public PinsViewModel(IEnumerable<Pin> pins, IEnumerable<Favorite> favorites, string? currentViewName)
        {
            Pins = pins;
            Favorites = favorites;
            CurrentViewName = currentViewName;
        }
    }
}