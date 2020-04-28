#include <iostream>
#include <vector>
#include <string>

#include "Geometry.h"
#include "Sphere.h"
#include "Box.h"

void report(Geometry* obj)
{
	std::cout << "----- Geometry Report -----" << std::endl << std::endl;
	std::cout << "Type: " << obj->getType() << std::endl << "Name: " << obj->getName() << std::endl;
	std::cout << "Volume: " << obj->computeVolume() << std::endl << "Surface Area: " << obj->computeSurface() << std::endl << std::endl;
}

int main()
{
	std::vector<Geometry*> items;

	items.push_back(new Box("Box 1", 1, 2, 3));
	items.push_back(new Box("Box 2", 2, 3, 4));
	items.push_back(new Sphere("Sphere 1", 5));
	items.push_back(new Sphere("Sphere 2", 6));

	for (int i = 0; i < items.size(); i++)
	{
		report(items[i]);
	}

	for (int i = 0; i < items.size(); i++)
	{
		delete items[i];
		items[i] = nullptr;
	}

	return 0;
}