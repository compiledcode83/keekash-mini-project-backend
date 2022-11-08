import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBase64, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class CursorFilterDto {
  @ApiProperty({ required: false, description: 'Paginates results forward' })
  @IsBase64()
  @IsOptional()
  afterCursor?: string;

  @ApiProperty({ required: false, description: 'Paginates results backward' })
  @IsBase64()
  @IsOptional()
  beforeCursor?: string;

  @ApiProperty({ example: 10, minimum: 1, maximum: 50, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(25)
  @IsOptional()
  limit = 5;

  @ApiProperty({ example: 'id', enum: ['id'], required: false })
  @IsOptional()
  @IsIn(['id'])
  orderParam = 'id';

  @ApiProperty({ example: 'ASC', enum: ['ASC', 'DESC'], required: false })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  orderType: 'ASC' | 'DESC' = 'DESC';

  constructor(partial?: Partial<CursorFilterDto>) {
    Object.assign(this, partial);
  }
}
