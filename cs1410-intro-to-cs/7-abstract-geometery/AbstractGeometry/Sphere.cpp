#include <string>

#include "Sphere.h"

Sphere::Sphere(std::string name, double radius) :
	Geometry(name, "Sphere"),
	m_radius(radius)
{}

double Sphere::computeVolume()
{
	const double pi = 3.1415926535897;
	return (4 / 3) * pi * m_radius * m_radius * m_radius;
}

double Sphere::computeSurface()
{
	const double pi = 3.1415926535897;
	return 4 * pi * m_radius * m_radius;
}
