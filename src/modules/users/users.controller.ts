import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserPremiumStatusDto } from './dtos/change-is-premium.dto';
import { AuthGuard } from 'guards/auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { Role } from 'utils/roles';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }
  @Patch(':id/premium-status')
  async updatePremiumStatus(
    @Param('id') id: string,
    @Body() updatePremiumStatusDto: UpdateUserPremiumStatusDto,
  ) {
    const result = await this.userService.updateUserPremiumStatus(
      id,
      updatePremiumStatusDto,
    );

    if (result.success) {
      return result;
    } else {
      throw new Error(result.message);
    }
  }

  @Patch(':id/ban')
  @UseGuards(AuthGuard, RolesGuard[Role.Admin])
  banUser(@Param('id') userId: string) {
    return this.userService.banUser(userId);
  }

  @Patch(':id/unban')
  unbanUser(@Param('id') userId: string) {
    return this.userService.unbanUser(userId);
  }
}
