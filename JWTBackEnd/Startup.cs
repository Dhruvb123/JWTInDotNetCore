using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JWTBackEnd
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{

			services.AddControllers();
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "JWTBackEnd", Version = "v1" });
			});
			// Add CORS policy
			services.AddCors(options =>
			{
				options.AddPolicy("AllowReactApp", builder =>
				{
					builder.WithOrigins("*")	
						   .AllowAnyHeader()
						   .AllowAnyMethod();
				});
			});
			// Add JWT Authentication
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = "yourapp.com",
						ValidAudience = "yourapp.com",
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("9b7c702881f6e41629b443b424b77f2c6815aa80c454817988efb7f05ca0194656bf83823302bb286113ce18533aa8a8166c53b55125a2d69f82cbcf3a611cc24eb40752bae83ff91b7381598309d0d51f7564db183d7f880618797ab28766deb6fbd8d1c0c3238666bb04de5690600e35323448c743f5be75fbe9edd2cae491")), // Use a secure key!
						ClockSkew = TimeSpan.FromSeconds(30)
					};
				});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "JWTBackEnd v1"));
			}

			// Enable CORS
			app.UseCors("AllowReactApp");

			app.UseRouting();

			app.UseAuthentication(); // Authentication Middleware

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
