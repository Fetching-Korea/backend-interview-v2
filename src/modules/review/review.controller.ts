import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { ReviewUpdateReqDto } from './dto/review-update-req.dto';
import { ReviewService } from './review.service';
import { ErrorResponseDto } from '../shared/dto/error-response.dto';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/jwt.guard';
import { ReviewDetailResDto } from './dto/review-detail-res.dto';
import { ReviewListResDto } from './dto/review-list-res.dto';

@ApiResponse({
  status: 400,
  description: 'BadRequest.',
  type: ErrorResponseDto,
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized.',
  type: ErrorResponseDto,
})
@ApiResponse({ status: 403, description: 'Forbidden.', type: ErrorResponseDto })
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('controller-review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly authService: AuthService,
    private readonly reviewService: ReviewService,
  ) {}

  @ApiTags('for-user')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 201,
    description: 'Review information',
    type: ReviewDetailResDto,
  })
  @ApiOperation({
    description: 'Insert a review',
  })
  @Post()
  async insert(@Request() req, @Body() reviewUpdateReqDto: ReviewUpdateReqDto) {
    const newReview = await this.reviewService.insert(
      reviewUpdateReqDto,
      req.user.id,
    );

    return <ReviewDetailResDto>{
      review: newReview,
    };
  }
}
