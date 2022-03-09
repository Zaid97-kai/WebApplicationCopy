using WebApplication2.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // устанавливаем контекст данных
            services.AddDbContext<BooksContext>(options =>
           options.UseSqlServer(SqlConnectionIntegratedSecurity));
            services.AddControllers(); // используем контроллеры без представлений
        }
        public static string SqlConnectionIntegratedSecurity
        {
            get
            {
                var sb = new SqlConnectionStringBuilder
                {
                    DataSource = "tcp:teatserver66.database.windows.net,1433",
                    // ѕодключение будет с проверкой подлинности пользовател€ Windows
                    IntegratedSecurity = false,
                    // Ќазвание целевой базы данных.
                    InitialCatalog = "Book",
                    UserID = "sophia",
                    Password = "almira@2004@"
                };
                return sb.ConnectionString;
            }
        }
        public void Configure(IApplicationBuilder app)
        {
            app.UseDeveloperExceptionPage();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // подключаем маршрутизацию на контроллеры
            });
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }

    }
}
