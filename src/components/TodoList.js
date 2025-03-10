// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, updateTodo } from '../services/TodoService';
import TodoForm from './TodoForm';
import LogoutButton from './LogoutButton';
import CategoryForm from './CategoryForm';
import TagForm from './TagForm';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import { getCategories, deleteCategory } from '../services/CategoryService';
import { getTags, deleteTag } from '../services/TagService';
import { Link } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({}); // Filtre parametreleri
  const [sortOptions, setSortOptions] = useState({ sortBy: 'createdAt', sortOrder: 'asc' }); // Sıralama seçenekleri

  // Filtre ve sıralama parametrelerine göre todo'ları getirir
  const fetchTodos = async () => {
    try {
      let url = 'http://localhost:8080/api/todos';
      const queryParams = [];
      if (filters.completed !== undefined && filters.completed !== null) {
        queryParams.push(`completed=${filters.completed}`);
      }
      if (filters.categoryId) {
        queryParams.push(`categoryId=${filters.categoryId}`);
      }
      if (filters.tagId) {
        queryParams.push(`tagId=${filters.tagId}`);
      }
      // Sıralama parametrelerini ekleyelim
      if (sortOptions.sortBy) {
        queryParams.push(`sortBy=${sortOptions.sortBy}`);
        queryParams.push(`sortOrder=${sortOptions.sortOrder}`);
      }
      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
      });
      if (!response.ok) {
        throw new Error('İstek sırasında bir hata oluştu.');
      }
      const data = await response.json();
      setTodos(data.content ? data.content : data);
    } catch (error) {
      console.error('Todo fetch hatası:', error.message);
    }
  };

  // Kategori listesini getirir (sadece ilgili kullanıcının)
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Kategori fetch hatası:', error.message);
    }
  };

  // Etiket listesini getirir (sadece ilgili kullanıcının)
  const fetchTags = async () => {
    try {
      const data = await getTags();
      setTags(data);
    } catch (error) {
      console.error('Etiket fetch hatası:', error.message);
    }
  };

  // Filtre veya sıralama seçenekleri değiştiğinde todo'ları yeniden getiriyoruz.
  useEffect(() => {
    fetchTodos();
  }, [filters, sortOptions]);

  // İlk yüklemede kategori ve etiket verilerini çekiyoruz.
  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  // Todo silme işlemi
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error('Todo silme hatası:', error.message);
    }
  };

  // Todo'yu tamamlandı olarak güncelleme işlemi
  const handleCompleteTodo = async (todo) => {
    const updatedTodo = {
      title: todo.title,
      description: todo.description,
      completed: true,
    };
    if (todo.category) {
      updatedTodo.category = { id: todo.category.id };
    }
    if (todo.tags && todo.tags.length > 0) {
      updatedTodo.tags = todo.tags.map(tag => ({ id: tag.id }));
    }
    try {
      await updateTodo(todo.id, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error('Todo tamamlama hatası:', error.message);
    }
  };

  // Kategori eklenince state güncellemesi
  const handleCategoryAdded = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  // Kategori silme işlemi
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error('Kategori silme hatası:', error.message);
    }
  };

  // Etiket eklenince state güncellemesi
  const handleTagAdded = (newTag) => {
    setTags((prev) => [...prev, newTag]);
  };

  // Etiket silme işlemi
  const handleDeleteTag = async (tagId) => {
    try {
      await deleteTag(tagId);
      fetchTags();
    } catch (error) {
      console.error('Etiket silme hatası:', error.message);
    }
  };

  // TodoFilter bileşeninden gelen filtre parametrelerini state'e aktarıyoruz
  const handleFilterChange = (filterObj) => {
    setFilters(filterObj);
  };

  // TodoSort bileşeninden gelen sıralama seçeneklerini state'e aktarıyoruz
  const handleSortChange = (sortObj) => {
    setSortOptions(sortObj);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <LogoutButton />

      {/* Filtreleme Bileşeni */}
      <TodoFilter 
        onFilterChange={handleFilterChange} 
        categories={categories} 
        tags={tags} 
      />

      {/* Sıralama Bileşeni */}
      <TodoSort onSortChange={handleSortChange} />

      {/* Kategori İşlemleri */}
      <h2>Kategori Ekle</h2>
      <CategoryForm onCategoryAdded={handleCategoryAdded} />
      <h3>Mevcut Kategoriler:</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}{' '}
            <button onClick={() => handleDeleteCategory(cat.id)}>Sil</button>
          </li>
        ))}
      </ul>

      {/* Etiket İşlemleri */}
      <h2>Etiket Ekle</h2>
      <TagForm onTagAdded={handleTagAdded} />
      <h3>Mevcut Etiketler:</h3>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.name}{' '}
            <button onClick={() => handleDeleteTag(tag.id)}>Sil</button>
          </li>
        ))}
      </ul>

      {/* Todo Ekleme Formu (kategori ve etiket seçenekleri props olarak gönderiliyor) */}
      <TodoForm categories={categories} tags={tags} fetchTodos={fetchTodos} />

      {/* Todo Listesi */}
      <h3>Todolar:</h3>
<ul>
  {todos.map((todo) => (
    <li key={todo.id}>
      <Link to={`/todos/${todo.id}`}>
        {todo.title} - {todo.description}
      </Link>{' '}
      {todo.category && todo.category.name && (
        <span>(Kategori: {todo.category.name})</span>
      )}
      {todo.tags && todo.tags.length > 0 && (
        <span> (Etiketler: {todo.tags.map((tag) => tag.name).join(', ')})</span>
      )}
      {!todo.completed && (
        <button onClick={() => handleCompleteTodo(todo)}>
          Tamamlandı Olarak İşaretle
        </button>
      )}
      <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default TodoList;
