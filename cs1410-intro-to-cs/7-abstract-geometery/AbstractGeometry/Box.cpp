#include <string>

#include "Box.h"


Box::Box(std::string name, double length, double width, double height) :
	Geometry(name, "Box"),
	m_length(length),
	m_width(width),
	m_height(height)
{}

double Box::computeVolume()
{
	return m_length * m_width * m_height;
}

double Box::computeSurface()
{
	return (2 * (m_height*m_length) + 2 * (m_height*m_width) + 2 * (m_length*m_width));
}
