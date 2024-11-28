using PinThePlace.Models;

namespace PinThePlace.ViewModels{

public class FavoritesViewModel
{
    public IEnumerable<Favorite> Favorites { get; set; }
    public string? CurrentViewName;

    public FavoritesViewModel(IEnumerable<Favorite> favorites, string? currentViewName)
    {
        Favorites = favorites;
         CurrentViewName = currentViewName;

    }
}
}