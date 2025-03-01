using JWTBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System;

namespace JWTBackEnd.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		[HttpPost("getLoginStatus")]
		public IActionResult GetLoginStatus(LoginPayload request)
		{
			if(request.UserName == "ABC" && request.Password == "123")
			{
				// Generate JWT token
				var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("9b7c702881f6e41629b443b424b77f2c6815aa80c454817988efb7f05ca0194656bf83823302bb286113ce18533aa8a8166c53b55125a2d69f82cbcf3a611cc24eb40752bae83ff91b7381598309d0d51f7564db183d7f880618797ab28766deb6fbd8d1c0c3238666bb04de5690600e35323448c743f5be75fbe9edd2cae491"));
				var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
				var token = new JwtSecurityToken(
					issuer: "yourapp.com",
					audience: "yourapp.com",
					expires: DateTime.UtcNow.AddMinutes(1),
					signingCredentials: credentials
				);
				var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

				return Ok(new { token = tokenString });
			}
			else
			{
				return StatusCode(404, "User Does Not Exists");
			}
		}
	}
}
