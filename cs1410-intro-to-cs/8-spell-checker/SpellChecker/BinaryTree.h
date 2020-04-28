#ifndef SPELLCHECKER_H
#define SPELLCHECKER_H

#include <memory>
#include <iostream>

template<typename T>
class BinaryTree
{
public:
	bool insert(T value);
	void remove(T value);
	bool search(T value);
	void display();
	unsigned int numberNodes();
	unsigned int numberLeafNodes();
	unsigned int height();
	void report();

private:
	class node
	{
	public:
		node(T value) :
			data(value),
			lptr(nullptr),
			rptr(nullptr)
		{}
		T data;
		std::shared_ptr<node> lptr;
		std::shared_ptr<node> rptr;
	};

	void insert(std::shared_ptr<node>& thisNode, std::shared_ptr<node> ptrNew);
	bool search(std::shared_ptr<node> thisNode, T value);
	void display(std::shared_ptr<node> thisNode);

	void remove(std::shared_ptr<node>& thisNode, T value);
	void remove(std::shared_ptr<node>& thisNode);

	unsigned int numberNodes(std::shared_ptr<node>& thisNode);
	unsigned int numberLeafNodes(std::shared_ptr<node>& thisNode);
	unsigned int height(std::shared_ptr<node>& thisNode);

	std::shared_ptr<node> m_root;
};

template<typename T>
bool BinaryTree<T>::insert(T value)
{
	if (!search(value))
	{
		std::shared_ptr<node> ptrNew = std::make_shared<node>(value);
		insert(m_root, ptrNew);

		return true;
	}
	else
		return false;
}

template<typename T>
void BinaryTree<T>::insert(std::shared_ptr<node>& thisNode, std::shared_ptr<node> ptrNew)
{
	if (thisNode == nullptr)
	{
		thisNode = ptrNew;
	}
	else if (thisNode->data < ptrNew->data)
	{
		insert(thisNode->rptr, ptrNew);
	}
	else
	{
		insert(thisNode->lptr, ptrNew);
	}
}

template<typename T>
void BinaryTree<T>::remove(T value)
{
	if (search(value))
		remove(m_root, value);
}

template<typename T>
void BinaryTree<T>::remove(std::shared_ptr<node>& thisNode, T value)
{
	if (thisNode->data == value)
	{
		remove(thisNode);
	}
	else if (thisNode->data < value)
	{
		remove(thisNode->rptr, value);
	}
	else
	{
		remove(thisNode->lptr, value);
	}
}

template<typename T>
void BinaryTree<T>::remove(std::shared_ptr<node>& thisNode)
{
	if (thisNode->rptr == nullptr)
	{
		thisNode = thisNode->lptr;
	}
	else if (thisNode->lptr == nullptr)
	{
		thisNode = thisNode->rptr;
	}
	else
	{
		std::shared_ptr<node> temp = thisNode->rptr;

		while (temp->lptr)
		{
			temp = temp->lptr;
		}

		temp->lptr = thisNode->lptr;
		thisNode = thisNode->rptr;
	}
}

template<typename T>
bool BinaryTree<T>::search(T value)
{
	return search(m_root, value);
}


template<typename T>
bool BinaryTree<T>::search(std::shared_ptr<node> thisNode, T value)
{
	if (thisNode == nullptr)
	{
		return false;
	}
	if (thisNode->data == value)
	{
		return true;
	}
	if (thisNode->data < value)
	{
		return search(thisNode->rptr, value);
	}
	else
	{
		return search(thisNode->lptr, value);
	}
}

template<typename T>
void BinaryTree<T>::display()
{
	display(m_root);
}

template<typename T>
void BinaryTree<T>::display(std::shared_ptr<node> thisNode)
{
	if (thisNode != nullptr)
	{
		display(thisNode->lptr);
		std::cout << thisNode->data << std::endl;
		display(thisNode->rptr);
	}
}

template<typename T>
unsigned int BinaryTree<T>::numberNodes()
{
	return numberNodes(m_root);
}

template<typename T>
unsigned int BinaryTree<T>::numberNodes(std::shared_ptr<node>& thisNode)
{
	unsigned int result = 0;
	if (thisNode != nullptr)
	{
		result++;
		result += numberNodes(thisNode->lptr);
		result += numberNodes(thisNode->rptr);
	}
	return result;
}


template<typename T>
unsigned int BinaryTree<T>::numberLeafNodes()
{
	return numberLeafNodes(m_root);
}

template<typename T>
unsigned int BinaryTree<T>::numberLeafNodes(std::shared_ptr<node>& thisNode)
{
	unsigned int result = 0;
	if (thisNode != nullptr)
	{
		if (thisNode->lptr == nullptr && thisNode->rptr == nullptr)
			result++;
		result += numberLeafNodes(thisNode->lptr);
		result += numberLeafNodes(thisNode->rptr);
	}
	return result;
}

template<typename T>
unsigned int BinaryTree<T>::height()
{
	return height(m_root);
}

template<typename T>
unsigned int BinaryTree<T>::height(std::shared_ptr<node>& thisNode)
{
	unsigned int result = 0;
	if (thisNode != nullptr)
	{
		unsigned int right = height(thisNode->rptr);
		unsigned int left = height(thisNode->lptr);
		if (thisNode->lptr == nullptr && thisNode->rptr == nullptr)
			return 1;
		else if (left > right)
		{
			result = 1 + left;
		}
		else
		{
			result = 1 + right;
		}
	}
	return result;
}

template<typename T>
void BinaryTree<T>::report()
{
	std::cout << std::endl << "--- Tree Stats ---" << std::endl;
	std::cout << "Total Nodes: " << numberNodes() << std::endl;
	std::cout << "Leaf Nodes: " << numberLeafNodes() << std::endl;
	std::cout << "Tree Height: " << height() << std::endl;
}

#endif