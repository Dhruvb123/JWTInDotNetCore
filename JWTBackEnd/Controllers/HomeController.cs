using JWTBackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWTBackEnd.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		
		[HttpGet("getHomeDetails")]
		[Authorize]
		public IActionResult GetHomeDetails()
		{
			var token = HttpContext.Request.Headers["Authorization"].ToString();
			return Ok("102, K street, P Building");
		}
	}
}
