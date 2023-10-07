namespace backend.Models
{
    public interface IItemsRepository
    {
        IEnumerable<ItemModel> GetAll();
    }
}
