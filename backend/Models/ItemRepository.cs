namespace backend.Models
{
    public class ItemRepository : IItemsRepository
    {
        private List<ItemModel> users = new List<ItemModel>();


        public ItemRepository()
        {

        }

        public IEnumerable<ItemModel> GetAll()
        {
            this.users.Add(new ItemModel { first = "first1", last = "last1" });
            this.users.Add(new ItemModel { first = "first2", last = "last2" });
            this.users.Add(new ItemModel { first = "first3", last = "last3" });
            return users;
        }

    }
}
