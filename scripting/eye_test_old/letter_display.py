import pygame
import random
import threading

# Global variables
font_size = 100
letters = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=5))
change_letters = False

def get_user_input():
    global font_size, letters, change_letters
    while True:
        user_input = input("Enter command: ")
        if user_input.lower() == "change":
            letters = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=5))
            change_letters = True
        else:
            try:
                font_size = int(user_input)
            except ValueError:
                print("Please enter a valid number for font size or 'change' to change letters.")

def main():
    # Initialize Pygame and the display
    pygame.init()
    infoObject = pygame.display.Info()
    screen = pygame.display.set_mode((infoObject.current_w, infoObject.current_h), pygame.NOFRAME)  # Windowed fullscreen
    screen_width, screen_height = screen.get_size()

    running = True
    global change_letters
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False

        # Set up font with the current font size
        font = pygame.font.SysFont(None, font_size)

        # Render the letters
        text = font.render(letters, True, (255, 255, 255))
        text_rect = text.get_rect(center=(screen_width/2, screen_height/2))

        # Update the screen
        screen.fill((0, 0, 0))
        screen.blit(text, text_rect)
        pygame.display.flip()

        # Reset the change_letters flag
        if change_letters:
            change_letters = False

    pygame.quit()

if __name__ == "__main__":
    # Start the user input thread
    input_thread = threading.Thread(target=get_user_input)
    input_thread.daemon = True
    input_thread.start()

    # Start the main function
    main()
