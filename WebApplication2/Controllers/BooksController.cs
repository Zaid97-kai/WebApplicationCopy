using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BooksContext? _db;
        public BooksController(BooksContext booksContext)

        {
            _db = booksContext;
        }
        // GET: api/<BooksController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> Get()
        {
            return await _db.Book.ToListAsync();
        }
        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> Get(int id)
        {
            Book book = await _db.Book.FirstOrDefaultAsync(x => x.id == id);
            if (book == null)
                return NotFound();
            return new ObjectResult(book);
        }
        // POST api/<BooksController>
        [HttpPost]
        public async Task<ActionResult<Book>> Post(Book book)
        {
            if (book == null)
            {
                return BadRequest();
            }
            _db.Book.Add(book);
            await _db.SaveChangesAsync();
            return Ok(book);
        }
        // PUT api/<BooksController>/
        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> Put(Book book)
        {
            if (book == null)
            {
                return BadRequest();
            }
            if (!_db.Book.Any(x => x.id == book.id))
            {
                return NotFound();
            }

            _db.Update(book);
            await _db.SaveChangesAsync();
            return Ok(book);
        }
        // DELETE api/<BooksController>/
        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> Delete(int id)
        {
            Book book = _db.Book.FirstOrDefault(x => x.id == id);
            if (book == null)
            {
                return NotFound();
            }
            _db.Book.Remove(book);
            await _db.SaveChangesAsync();
            return Ok(book); ;
        }
    }
}

