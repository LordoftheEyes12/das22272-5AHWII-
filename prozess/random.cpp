#include <iostream>
#include <cstring>

int main(int argc, char* argv[])
{
    int i = 1; // Start from 1 to skip the program name
    while (i < argc && strcmp(argv[i], "0") != 0) 
    {
        for (int j = 0; j < strlen(argv[i]); j++) {
            char character = argv[i][j];

            if (character >= 'A' && character <= 'Z') {
                character = ((character - 'A') + argc) % 26 + 'A';
            } else if (character >= 'a' && character <= 'z') {
                character = ((character - 'a') + argc) % 26 + 'a';
            }
            std::cout << character;
        }
        i++;
    }
    std::cout << std::endl;
    std::cout.flush();
    return 0;
}
