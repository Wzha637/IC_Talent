using IC_Talent.Models.Dto;

namespace IC_Talent.Models.Mappers
{
    public static class SaleMapper
    {
        public static SaleDto MapSale(Sale sale)
        {
            var saleDto = new SaleDto();

            if(sale != null)
            {
                saleDto.Id = sale.Id;
                saleDto.ProductName = sale.Product?.Name;
                saleDto.CustomerName = sale.Customer?.Name;
                saleDto.StoreName = sale.Store?.Name;
                saleDto.DateSold = sale.DateSold;
            }
            return saleDto;
        }


    }
}
