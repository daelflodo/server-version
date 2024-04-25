import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateUserAdminDto } from './dto/create-userAdmin.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('user-admin')
  createUserAdmin(@Body() CreateUserAdminDto: CreateUserAdminDto) {
    return this.adminService.createUserAdmin(CreateUserAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':adminId')
  findOne(@Param('adminId', ParseUUIDPipe) id: string) {
    return this.adminService.findOne(id);
  }

  @AccessLevel('FISCAL')
  @Patch(':adminId')
  update(@Param('adminId') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }


  @Delete(':adminId')
  remove(@Param('adminId') id: string) {
    return this.adminService.remove(+id);
  }
}
