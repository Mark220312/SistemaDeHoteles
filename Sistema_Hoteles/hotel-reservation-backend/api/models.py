from django.db import models

class Room(models.Model):
    number = models.IntegerField(unique=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Room {self.number} ({'Available' if self.is_available else 'Occupied'})"

class Reservation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    guest_name = models.CharField(max_length=255)
    check_in = models.DateField()
    check_out = models.DateField()

    def __str__(self):
        return f"Reservation for {self.guest_name} in Room {self.room.number} from {self.check_in} to {self.check_out}"
