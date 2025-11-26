import pytest
import datetime
from src.algorithms.radix_sort import RadixSort, DataTypeOrder

class TestRadixSort:

    @pytest.fixture
    def radix_sort_instance(self):
        return RadixSort()

    # Testes para _get_data_type_rank
    def test_get_data_type_rank_integer(self, radix_sort_instance):
        assert radix_sort_instance._get_data_type_rank(10) == DataTypeOrder.INTEGER

    def test_get_data_type_rank_string(self, radix_sort_instance):
        assert radix_sort_instance._get_data_type_rank("test") == DataTypeOrder.STRING

    def test_get_data_type_rank_date(self, radix_sort_instance):
        assert radix_sort_instance._get_data_type_rank(datetime.date.today()) == DataTypeOrder.DATE

    def test_get_data_type_rank_datetime(self, radix_sort_instance):
        assert radix_sort_instance._get_data_type_rank(datetime.datetime.now()) == DataTypeOrder.DATE

    def test_get_data_type_rank_unsupported(self, radix_sort_instance):
        with pytest.raises(TypeError):
            radix_sort_instance._get_data_type_rank(1.0)

    # Testes para _normalize_value
    def test_normalize_value_integer(self, radix_sort_instance):
        assert radix_sort_instance._normalize_value(123) == "00000000000000000123"
        assert radix_sort_instance._normalize_value(-45) == "-00000000000000000045"

    def test_normalize_value_string(self, radix_sort_instance):
        # Exemplo: 'a' -> 0097, 'b' -> 0098
        normalized_a = f'{ord('a'):04d}'
        normalized_b = f'{ord('b'):04d}'
        assert radix_sort_instance._normalize_value("ab").startswith(f'{normalized_a}{normalized_b}')
        assert radix_sort_instance._normalize_value("ab").endswith('0' * (200 - len(normalized_a) - len(normalized_b)))

    def test_normalize_value_date(self, radix_sort_instance):
        today = datetime.datetime(2023, 1, 1, 10, 30, 0)
        normalized = radix_sort_instance._normalize_value(today)
        assert normalized == "20230101103000000000"

    def test_normalize_value_unsupported(self, radix_sort_instance):
        with pytest.raises(TypeError):
            radix_sort_instance._normalize_value(1.0)

    # Testes para _separate_nulls
    def test_separate_nulls(self, radix_sort_instance):
        data = [1, None, 2, None, 3]
        nulls, non_nulls = radix_sort_instance._separate_nulls(data)
        assert nulls == [None, None]
        assert non_nulls == [1, 2, 3]

    def test_separate_nulls_no_nulls(self, radix_sort_instance):
        data = [1, 2, 3]
        nulls, non_nulls = radix_sort_instance._separate_nulls(data)
        assert nulls == []
        assert non_nulls == [1, 2, 3]

    def test_separate_nulls_all_nulls(self, radix_sort_instance):
        data = [None, None]
        nulls, non_nulls = radix_sort_instance._separate_nulls(data)
        assert nulls == [None, None]
        assert non_nulls == []

    # Testes para _group_by_data_type
    def test_group_by_data_type(self, radix_sort_instance):
        data = [1, "a", datetime.date(2023, 1, 1), 2, "b"]
        groups = radix_sort_instance._group_by_data_type(data)
        assert DataTypeOrder.INTEGER in groups
        assert DataTypeOrder.STRING in groups
        assert DataTypeOrder.DATE in groups
        assert set(groups[DataTypeOrder.INTEGER]) == {1, 2}
        assert set(groups[DataTypeOrder.STRING]) == {"a", "b"}
        assert groups[DataTypeOrder.DATE] == [datetime.date(2023, 1, 1)]

    # Testes de ordenação ascendente
    def test_sort_asc_integers(self, radix_sort_instance):
        data = [170, 45, 75, 90, 2, 24, 802, 66]
        expected = [2, 24, 45, 66, 75, 90, 170, 802]
        assert radix_sort_instance.sort_asc(data) == expected

    def test_sort_asc_integers_with_negatives(self, radix_sort_instance):
        data = [170, -45, 75, 90, -2, 24, 802, -66]
        expected = [-66, -45, -2, 24, 75, 90, 170, 802]
        assert radix_sort_instance.sort_asc(data) == expected

    def test_sort_asc_strings(self, radix_sort_instance):
        data = ["banana", "apple", "cherry", "date"]
        expected = ["apple", "banana", "cherry", "date"]
        assert radix_sort_instance.sort_asc(data) == expected

    def test_sort_asc_dates(self, radix_sort_instance):
        d1 = datetime.date(2023, 1, 1)
        d2 = datetime.date(2022, 12, 31)
        d3 = datetime.date(2023, 1, 2)
        data = [d1, d2, d3]
        expected = [d2, d1, d3]
        assert radix_sort_instance.sort_asc(data) == expected

    def test_sort_asc_mixed_types(self, radix_sort_instance):
        d1 = datetime.date(2023, 1, 1)
        data = [10, "apple", d1, 5, "banana"]
        # A ordem esperada é por tipo: Inteiros, Datas, Strings
        expected = [5, 10, d1, "apple", "banana"]
        assert radix_sort_instance.sort_asc(data) == expected

    def test_sort_asc_with_nulls(self, radix_sort_instance):
        data = [10, None, "apple", 5, None, "banana"]
        expected = [None, None, 5, 10, "apple", "banana"]
        assert radix_sort_instance.sort_asc(data) == expected

    def test_sort_asc_empty_list(self, radix_sort_instance):
        assert radix_sort_instance.sort_asc([]) == []

    def test_sort_asc_single_element(self, radix_sort_instance):
        assert radix_sort_instance.sort_asc([5]) == [5]

    # Testes de ordenação descendente
    def test_sort_desc_integers(self, radix_sort_instance):
        data = [170, 45, 75, 90, 2, 24, 802, 66]
        expected = [802, 170, 90, 75, 66, 45, 24, 2]
        assert radix_sort_instance.sort_desc(data) == expected

    def test_sort_desc_strings(self, radix_sort_instance):
        data = ["banana", "apple", "cherry", "date"]
        expected = ["date", "cherry", "banana", "apple"]
        assert radix_sort_instance.sort_desc(data) == expected

    def test_sort_desc_mixed_types(self, radix_sort_instance):
        d1 = datetime.date(2023, 1, 1)
        data = [10, "apple", d1, 5, "banana"]
        # A ordem esperada é por tipo: Strings, Datas, Inteiros (inverso do asc)
        expected = ["banana", "apple", d1, 10, 5]
        assert radix_sort_instance.sort_desc(data) == expected

    def test_sort_desc_with_nulls(self, radix_sort_instance):
        data = [10, None, "apple", 5, None, "banana"]
        expected = [None, None, "banana", "apple", 10, 5]
        assert radix_sort_instance.sort_desc(data) == expected

    def test_sort_desc_empty_list(self, radix_sort_instance):
        assert radix_sort_instance.sort_desc([]) == []

    def test_sort_desc_single_element(self, radix_sort_instance):
        assert radix_sort_instance.sort_desc([5]) == [5]