import sys, json
from neopixel import *

count = 1

#Read data from stdin
def read_in():
    data = input()
    # lines = sys.stdin.readlines()
    print("data: %s"%data)
    # Since our input would only be having one line, parse our JSON data from that
    return data
    # return "Yes!!"

def main():
    #get our data as an array from read_in()
    lines = read_in()

    # Sum  of all the items in the providen array
    # total_sum_inArray = 0
    # for item in lines:
    #     total_sum_inArray += item

    #return the sum to the output stream
    # print total_sum_inArray
    # print "Yes!!"
    global count
    if count > 1:
        return
    count = count + 1
    main()


# Start process
if __name__ == '__main__':
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP)
    # Intialize the library (must be called once before other functions).
    strip.begin()
    # strip.setPixelColor(0, Color(236, 51, 77))
    # strip.show()
    main()
