using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IC_Talent.Models;
using IC_Talent.Models.Dto;
using IC_Talent.Models.Mappers;

namespace IC_Talent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly IcDbContext _context;

        public SalesController(IcDbContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public ActionResult<IEnumerable<SaleDto>> GetSales()
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var sales = new List<SaleDto>();
            foreach (Sale item in _context.Sales)
            {
                var customer = _context.Customers.FirstOrDefault(customer => customer.Id == item.CustomerId);
                var product = _context.Products.FirstOrDefault(product => product.Id == item.ProductId);
                var store = _context.Stores.FirstOrDefault(store => store.Id == item.StoreId);
                var sale = new SaleDto()
                {
                    Id = item.Id,
                    CustomerName = customer?.Name,
                    ProductName = product?.Name,
                    StoreName = store?.Name,
                    DateSold = item.DateSold
                };
                sales.Add(sale);
            }
            return sales;
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
          if (_context.Sales == null)
          {
              return NotFound();
          }
            var sale = await _context.Sales.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, Sale sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(Sale sale)
        {
          if (_context.Sales == null)
          {
              return Problem("Entity set 'IcDbContext.Sales'  is null.");
          }
            _context.Sales.Add(sale);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SaleExists(sale.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            return (_context.Sales?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
