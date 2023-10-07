using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]

    public class ItemsController : ControllerBase
    {

        private readonly ILogger<ItemsController> _logger;

        static readonly Models.IItemsRepository repository = new Models.ItemRepository();

        public ItemsController(ILogger<ItemsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/items")]
        public IEnumerable<Models.ItemModel> GetAllItems()
        {
            var ss = repository.GetAll();
            return ss;
        }




    }
}
