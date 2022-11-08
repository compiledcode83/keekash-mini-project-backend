import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';
import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency..dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @ApiOperation({ description: `Get currency list` })
  @ApiResponse(ApiResponseHelper.success(Currency, HttpStatus.OK))
  @Get('all')
  async findAll(): Promise<any> {
    return this.currencyService.findAll();
  }

  @Get()
  async findBySymbol(@Query('symbol') symbol: string): Promise<Currency> {
    return this.currencyService.findBySymbol(symbol);
  }

  @Post()
  async create(@Body() body: CreateCurrencyDto): Promise<Currency> {
    return this.currencyService.create(body);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) currencyId: number, @Body() body: UpdateCurrencyDto): Promise<Currency> {
    return this.currencyService.update(currencyId, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) currencyId: number): Promise<void> {
    return this.currencyService.delete(currencyId);
  }
}
