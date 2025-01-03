from django.contrib import admin
from .models import Room, Reservation

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('number', 'is_available')
    list_filter = ('is_available',)

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('guest_name', 'room', 'check_in', 'check_out')
    list_filter = ('check_in', 'check_out')
