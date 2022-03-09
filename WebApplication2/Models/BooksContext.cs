using Microsoft.EntityFrameworkCore;
namespace WebApplication2.Models
{
    public class BooksContext : DbContext
    {
        public DbSet<Book> Book { get; set; }
        public BooksContext(DbContextOptions<BooksContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
