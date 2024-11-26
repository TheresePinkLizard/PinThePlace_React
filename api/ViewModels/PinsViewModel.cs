using PinThePlace.Models;

namespace PinThePlace.ViewModels
{
    public class PinsViewModel
    {
        public IEnumerable<Pin> Pins;
        
        // for å gjøre det lettere å holde styr på de forskjellige navnene som skal byttes ut med currentViewName
        public string? CurrentViewName;

        public PinsViewModel(IEnumerable<Pin> pins, string? currentViewName)
        {
            Pins = pins;
            CurrentViewName = currentViewName;
        }
    }
}