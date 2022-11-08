import { Body, Controller, Get, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';
import { BalanceResponseDto } from './dto/balance-response.dto';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { DepositBalanceDto } from './dto/deposit-balance.dto';
import { TransactionFilterDto } from './dto/transaction.filter.dto';
import { WithdrawBalanceDto } from './dto/withdraw-balance.dto';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ description: `Get all transactions by filters (currencyId, fromDate, todate)` })
  @ApiResponse(ApiResponseHelper.success(Transaction, HttpStatus.OK))
  @ApiResponse(ApiResponseHelper.unauthorized())
  @ApiBearerAuth()
  @Get('transactions')
  async findAllPaginated(@Query() searchParams: TransactionFilterDto, @Request() req) {
    return this.transactionService.findAllPaginated(searchParams, req.user.uuid);
  }

  @ApiOperation({ description: `Get all transactions by filters (currencyId, fromDate, todate)` })
  @ApiResponse(ApiResponseHelper.success(BalanceResponseDto, HttpStatus.OK))
  @ApiResponse(ApiResponseHelper.unauthorized())
  @ApiBearerAuth()
  @Get('balance')
  async getBalanceAll(@Request() req) {
    return this.transactionService.getBalanceAll(req.user.uuid);
  }

  @ApiOperation({ description: `Get all transactions by filters (currencyId, fromDate, todate)` })
  @ApiResponse(ApiResponseHelper.success(BalanceResponseDto, HttpStatus.OK))
  @ApiResponse(ApiResponseHelper.unauthorized())
  @ApiBearerAuth()
  @Get('balance/:currency')
  async getBalanceByCurrency(@Param('currency') symbol: string, @Request() req) {
    return this.transactionService.getBalanceByCurrency(req.user.uuid, symbol);
  }

  @ApiOperation({ description: `Convert currency from one to another` })
  @ApiResponse(ApiResponseHelper.success(Transaction, HttpStatus.OK))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @ApiBearerAuth()
  @Post('convert')
  async convertCurrency(@Body() body: ConvertCurrencyDto, @Request() req): Promise<null> {
    return this.transactionService.convertCurrency(
      body.fromCurrencyId,
      body.fromCurrencyAmount,
      body.toCurrencyId,
      body.toCurrencyAmount,
      req.user.uuid,
    );
  }

  @ApiOperation({ description: `Deposit balance by currency` })
  @ApiResponse(ApiResponseHelper.success(Transaction, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.unauthorized())
  @ApiBearerAuth()
  @Post('deposit')
  async deposit(@Body() body: DepositBalanceDto, @Request() req): Promise<Transaction> {
    return this.transactionService.createTransaction(body.currencyId, body.amount, req.user.uuid, 'Deposit');
  }

  @ApiOperation({ description: `Withdraw balance by currency` })
  @ApiResponse(ApiResponseHelper.success(Transaction, HttpStatus.CREATED))
  @ApiResponse(ApiResponseHelper.unauthorized())
  @ApiBearerAuth()
  @Post('withdraw')
  async withdraw(@Body() body: WithdrawBalanceDto, @Request() req): Promise<Transaction> {
    return this.transactionService.createTransaction(body.currencyId, -body.amount, req.user.uuid, 'Withdraw');
  }
}
